"use client";

import { useState } from "react";
import Link from "next/link";

const s3UploadCode = `// s3Upload.js - AWS S3 File Upload
const AWS = require('aws-sdk');
const multer = require('multer');
const File = require('./models/File');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload to S3
const uploadToS3 = async (file, userId) => {
  const key = \`uploads/\${userId}/\${Date.now()}-\${file.originalname}\`;
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'private'
  };
  
  try {
    const result = await s3.upload(params).promise();
    return {
      success: true,
      url: result.Location,
      key: result.Key
    };
  } catch (error) {
    console.error('S3 upload error:', error);
    return { success: false, error: error.message };
  }
};

// Upload handler
const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
    
    const userId = req.user.userId;
    const uploadResult = await uploadToS3(req.file, userId);
    
    if (!uploadResult.success) {
      return res.status(500).json({ error: 'Upload failed', details: uploadResult.error });
    }
    
    // Save file metadata to database
    const fileRecord = new File({
      originalName: req.file.originalname,
      filename: uploadResult.key,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: uploadResult.url,
      uploadedBy: userId,
      storageType: 's3'
    });
    
    await fileRecord.save();
    
    res.json({
      message: 'File uploaded successfully',
      file: {
        id: fileRecord._id,
        originalName: fileRecord.originalName,
        url: uploadResult.url,
        size: fileRecord.size,
        mimetype: fileRecord.mimetype
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
};

module.exports = { upload, handleUpload };`;

const fileModelCode = `// models/File.js - File Model
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  storageType: {
    type: String,
    enum: ['s3', 'local'],
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

fileSchema.index({ uploadedBy: 1 });
fileSchema.index({ mimetype: 1 });

module.exports = mongoose.model('File', fileSchema);`;

const routesCode = `// routes/files.js - File Upload Routes
const express = require('express');
const { upload, handleUpload } = require('../s3Upload');
const { authMiddleware } = require('../auth');
const File = require('../models/File');
const router = express.Router();

// Upload file to S3
router.post('/upload', authMiddleware, upload.single('file'), handleUpload);

// Get user files
router.get('/my-files', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 20, type } = req.query;
    const userId = req.user.userId;
    
    const query = { uploadedBy: userId };
    if (type) {
      query.mimetype = new RegExp(type, 'i');
    }
    
    const files = await File.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    const total = await File.countDocuments(query);
    
    res.json({
      files,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Delete file
router.delete('/:fileId', authMiddleware, async (req, res) => {
  try {
    const { fileId } = req.params;
    const userId = req.user.userId;
    
    const file = await File.findOne({ _id: fileId, uploadedBy: userId });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Delete from S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
    
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.filename
    }).promise();
    
    // Delete from database
    await File.findByIdAndDelete(fileId);
    
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;`;

export default function S3UploadComponent() {
  const [activeTab, setActiveTab] = useState("s3");
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const tabs = [
    { id: "s3", label: "S3 Upload", code: s3UploadCode },
    { id: "model", label: "File Model", code: fileModelCode },
    { id: "routes", label: "Routes", code: routesCode }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
    

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/components" className="hover:text-white">Components</Link>
          <span>/</span>
          <Link href="/components/file-storage" className="hover:text-white">File Storage</Link>
          <span>/</span>
          <span>AWS S3 File Upload</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AWS S3 File Upload</h1>
          <p className="text-slate-400 text-lg mb-4">
            Upload files to Amazon S3 with Multer, file validation, and metadata storage
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {["AWS S3", "Multer", "File Upload", "MongoDB"].map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Installation</h2>
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Install dependencies</span>
                <button
                  onClick={() => copyToClipboard("npm install aws-sdk multer mongoose", "install")}
                  className="text-sm text-[#539E43] hover:text-[#4a8a3c] transition-colors"
                >
                  {copied === "install" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-slate-300">npm install aws-sdk multer mongoose</code>
            </div>
            
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">API Routes</span>
                <button
                  onClick={() => copyToClipboard("POST /files/upload\nGET /files/my-files\nDELETE /files/:fileId", "routes")}
                  className="text-sm text-[#539E43] hover:text-[#4a8a3c] transition-colors"
                >
                  {copied === "routes" ? "Copied!" : "Copy"}
                </button>
              </div>
              <code className="text-sm text-slate-300">
                POST /files/upload<br/>
                GET /files/my-files<br/>
                DELETE /files/:fileId
              </code>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-slate-700 mb-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-[#539E43] border-b-2 border-[#539E43]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <span className="text-sm text-slate-400">
                {tabs.find(t => t.id === activeTab)?.label}
              </span>
              <button
                onClick={() => copyToClipboard(tabs.find(t => t.id === activeTab)?.code || "", activeTab)}
                className="flex items-center gap-2 px-3 py-1 bg-[#539E43] hover:bg-[#4a8a3c] text-white text-sm rounded transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                {copied === activeTab ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="text-slate-300">
                {tabs.find(t => t.id === activeTab)?.code}
              </code>
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Usage</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <ol className="text-slate-300 space-y-2 text-sm">
              <li>1. Configure AWS credentials and S3 bucket</li>
              <li>2. Set up Multer with file validation</li>
              <li>3. Upload files using multipart/form-data</li>
              <li>4. Store file metadata in MongoDB</li>
              <li>5. Manage files with list and delete operations</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <code className="text-sm text-slate-300">
              AWS_ACCESS_KEY_ID=your_aws_access_key<br/>
              AWS_SECRET_ACCESS_KEY=your_aws_secret_key<br/>
              AWS_REGION=us-east-1<br/>
              AWS_S3_BUCKET=your-bucket-name<br/>
              MONGODB_URI=mongodb://localhost:27017/files
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}