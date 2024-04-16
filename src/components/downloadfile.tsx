import React from 'react';

const DownloadFile = () => {
  const handleDownload = () => {
    // Replace 'https://example.com/path/to/file' with the actual download link
    const downloadLink = 'https://cloud.appwrite.io/v1/storage/buckets/660e8aa1521417614a44/files/661d72c884fc3d119c93/view?project=660e8a4baeaf25149b31&mode=admin';
    const fileName = 'testfile.csv'; // Specify the desired filename

    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = downloadLink;
    anchor.download = fileName;

    // Trigger a click event on the anchor element
    document.body.appendChild(anchor);
    anchor.click();

    // Cleanup: remove the anchor element
    document.body.removeChild(anchor);
  };

  return (
    <button onClick={handleDownload}>Download File</button>
  );
};

export default DownloadFile;
