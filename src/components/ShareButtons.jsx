import React, { useState } from 'react';
    import {
      FacebookShareButton,
      TwitterShareButton,
      LinkedinShareButton,
      EmailShareButton,
      FacebookIcon,
      TwitterIcon,
      LinkedinIcon,
      EmailIcon,
    } from 'react-share';

    export default function ShareButtons({ url, title, onShare }) {
      const [copySuccess, setCopySuccess] = useState('');

      const handleCopyLink = async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess('Link copied!');
          setTimeout(() => setCopySuccess(''), 2000);
          onShare && onShare('copy');
        } catch (err) {
          setCopySuccess('Failed to copy');
          setTimeout(() => setCopySuccess(''), 2000);
        }
      };

      const handleShare = (platform) => {
        onShare && onShare(platform);
      };

      return (
        <div className="flex items-center space-x-4">
          <FacebookShareButton url={url} quote={title} onClick={() => handleShare('facebook')}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={url} title={title} onClick={() => handleShare('twitter')}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url} title={title} onClick={() => handleShare('linkedin')}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <EmailShareButton url={url} subject={title} onClick={() => handleShare('email')}>
            <EmailIcon size={32} round />
          </EmailShareButton>
          <button
            onClick={handleCopyLink}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded"
          >
            {copySuccess || 'Copy Link'}
          </button>
        </div>
      );
    }
