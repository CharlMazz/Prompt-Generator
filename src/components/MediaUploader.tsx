import React, { useState, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon, Video, FileWarning } from "lucide-react";
import { MediaFile } from "../types";

interface MediaUploaderProps {
  mediaFiles: MediaFile[];
  onMediaFilesChange: (files: MediaFile[]) => void;
}

export default function MediaUploader({ mediaFiles, onMediaFilesChange }: MediaUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (filesList: FileList) => {
    const newMediaItems: MediaFile[] = [];

    Array.from(filesList).forEach((file) => {
      // Create a unique id
      const id = Math.random().toString(36).substring(2, 9);
      
      const newItem: MediaFile = {
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        description: "", // default blank, user can input custom logic
      };

      // If it's an image, let's generate a base64 preview URL
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onMediaFilesChange([
              ...mediaFiles,
              { ...newItem, dataUrl: e.target.result as string }
            ]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        newMediaItems.push(newItem);
        onMediaFilesChange([...mediaFiles, ...newMediaItems]);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    onMediaFilesChange(mediaFiles.filter((item) => item.id !== id));
  };

  const updateFileDescription = (id: string, description: string) => {
    onMediaFilesChange(
      mediaFiles.map((item) => (item.id === id ? { ...item, description } : item))
    );
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="w-5 h-5 text-emerald-500" />;
    if (type.startsWith("video/")) return <Video className="w-5 h-5 text-indigo-500" />;
    return <FileText className="w-5 h-5 text-zinc-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Area */}
      <div
        id="media-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragOver
            ? "border-amber-500 bg-amber-50/50"
            : "border-zinc-300 hover:border-zinc-400 bg-white"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          className="hidden"
          accept="image/*,video/*,application/pdf"
        />
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-3 bg-zinc-50 rounded-full text-zinc-500 group-hover:scale-105 transition-transform duration-200">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-zinc-800">
            Drag and drop your brand resources, or <span className="text-amber-600">browse files</span>
          </p>
          <p className="text-xs text-zinc-500">
            Supports logos, high-res photos, background videos, PDFs, and guides
          </p>
        </div>
      </div>

      {/* Render Uploaded File Cards */}
      {mediaFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Added Media Assets ({mediaFiles.length})
          </h4>
          <div className="grid gap-3">
            {mediaFiles.map((item) => (
              <div
                key={item.id}
                id={`media-card-${item.id}`}
                className="bg-white rounded-lg border border-zinc-200 p-3 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-xs transition-shadow duration-150"
              >
                {/* Visual Thumbnail or Icon */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                  {item.dataUrl ? (
                    <div className="w-12 h-12 rounded-md bg-zinc-100 overflow-hidden border border-zinc-200 flex-shrink-0">
                      <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-md bg-zinc-50 flex items-center justify-center border border-zinc-200 flex-shrink-0">
                      {getFileIcon(item.type)}
                    </div>
                  )}
                  <div className="min-w-0 max-w-[150px] md:max-w-[200px]">
                    <p className="text-xs font-semibold text-zinc-800 truncate" title={item.name}>
                      {item.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      {formatSize(item.size)} • {item.type.split("/")[1] || "File"}
                    </p>
                  </div>
                </div>

                {/* Purpose/Use-case description */}
                <div className="flex-grow">
                  <input
                    type="text"
                    id={`media-desc-input-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateFileDescription(item.id, e.target.value)}
                    placeholder="Describe how to use (e.g., 'Primary logo in navigation', 'Hero bg video')"
                    className="w-full text-xs bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-amber-400 focus:outline-hidden py-1.5 px-2.5 rounded-md text-zinc-700 placeholder-zinc-400 transition-colors"
                  />
                </div>

                {/* Remove tool */}
                <button
                  type="button"
                  id={`media-remove-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(item.id);
                  }}
                  className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors self-end md:self-auto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
