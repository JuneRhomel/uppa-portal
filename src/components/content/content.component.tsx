import React from 'react';
import ContentContainerStyle from './style/content_container.style';
export default function ContentComponent({
    children
}: { children: React.ReactNode }) {
    return <ContentContainerStyle>{children}</ContentContainerStyle>;
}