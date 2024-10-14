import React from 'react'

interface BlockHtmlProps {
    htmlContent: string;
}

function BlockHtml({ htmlContent }: BlockHtmlProps) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default BlockHtml
