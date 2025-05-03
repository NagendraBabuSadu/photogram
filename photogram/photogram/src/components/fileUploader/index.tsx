import React, { useCallback, useRef, useState, useEffect } from 'react';
import { OutputFileEntry } from '@uploadcare/file-uploader';
import { FileUploaderRegular, type UploadCtxProvider } from '@uploadcare/react-uploader';
import { FileEntry } from '@/types';

import '@uploadcare/react-uploader/core.css';

type FileUploaderProps = {
    fileEntry: FileEntry;
    onChange: (files: OutputFileEntry[]) => void;
};

export default function FileUploader({ fileEntry, onChange }: FileUploaderProps) {
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<'success'>[]>([]);
    const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

    // Initialize with existing files from fileEntry
    useEffect(() => {
        if (fileEntry?.files?.length) {
            console.log("filentry, lenghth", fileEntry?.files)
            setUploadedFiles(fileEntry.files);
        }
    }, [fileEntry]);

    const handleRemoveClick = useCallback(
        (uuid: OutputFileEntry['uuid']) => {
            const updated = uploadedFiles.filter(f => f.uuid !== uuid);
            setUploadedFiles(updated);
            onChange(updated);
            console.log("onChange", onChange(updated))
        },
        [uploadedFiles, onChange]
    );

    const resetUploaderState = useCallback(() => {
        ctxProviderRef.current?.uploadCollection.clearAll();
    }, []);

    const handleModalCloseEvent = useCallback(() => {
        console.log("Modal close event triggered");
        resetUploaderState();
    }, [resetUploaderState]);

    const handleChangeEvent = useCallback((e: CustomEvent) => {
        const entries = (e as unknown as { allEntries?: OutputFileEntry[] }).allEntries ?? [];

        const successful = entries
            .filter((entry: OutputFileEntry) => entry.status === 'success')
            .map((entry: OutputFileEntry) => ({
                cdnUrl: entry.cdnUrl,
                fileInfo: entry.fileInfo,
                uuid: entry.uuid,
            })) as OutputFileEntry<'success'>[];

        // Append instead of replace
        setUploadedFiles(successful);
        onChange(successful);
    }, [fileEntry]);

    return (
        <div>
            <FileUploaderRegular
                imgOnly
                multiple
                removeCopyright
                confirmUpload={false}
                apiRef={ctxProviderRef}
                onModalClose={handleModalCloseEvent}
                onChange={handleChangeEvent}
                pubkey="40d95b48c8f0297919a5"
            />

            <div className='grid grid-cols-2 gap-4 mt-8'>
                {uploadedFiles.map(file => (
                    <div key={file.uuid} className='relative'>
                        <img
                            className="w-full h-60 object-cover"
                            src={`${file.cdnUrl}`}
                            alt={file.fileInfo?.originalFilename || ''}
                            title={file.fileInfo?.originalFilename || ''}
                        />
                        <div className="absolute -top-2 -right-2">
                            <button
                                type="button"
                                className="w-8 h-8 flex items-center justify-center text-white bg-amber-800 hover:bg-amber-900 rounded-full shadow-md"
                                onClick={() => handleRemoveClick(file.uuid)}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}