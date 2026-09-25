import React from 'react';

function GithubFileManager(
  {className, pat, path}: {
    className?: string,
    pat: string,
    path: string
  }
) {
  return (
    <div className={className}>
      {/* design similar UI as https://www.creative-tim.com/ui/block/file-manager */}
      {/* but instead of folders it should act as file type filter */}
      {/* each file should have the similar option button as folder in that page */}
      {/* this option shall allow copying URL, viewing in new tab, downloading, deleting, and validating */}
      {/* Validatin will check the file's existance against github these will come handy for files just uploaded. and not yet published by github pages */}
      {/* these files will be temporarily stored in local storage right after being uploaded and will be lost on refresh */}
      {/* idea is if they are uploaded and published they will come through gh API shortly anyway */}
      {/* unverified is a category that lists such local files and won't allow delete. other actions are allowed cause base64 is stored locally */}
      {/* This file manager shall list all the files inside public/uploads directory */}
      {/* Allow user to download the file, copy the URL, upload the file, delete the file */}
      {/* Deleting won't use any smart detection, any existing usage will start failing, so just show a warning before deleting */}
      {/* Adding file will expose it to public, so we should show a warning before uploading */}

    </div>
  );
}

export default GithubFileManager;
