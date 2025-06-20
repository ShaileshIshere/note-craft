"use client";

import { memo, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Layout } from "../components/Layout";
import { motion } from "framer-motion";
import { TitleEditor } from "../components/publish/TitleEditor";
import { CategorySelector } from "../components/publish/CategorySelector";
import { ImageUploadWrapper } from "../components/publish/ImageUploadWrapper";
import { ContentEditor } from "../components/publish/ContentEditor";
import { PublishButtonOptimized } from "../components/publish/PublishButton";
import { WritingTips } from "../components/publish/WritingTips";
import { CreativeLoader } from "../components/CreativeLoader";
import { usePublishStore } from "../store/publishStore";
import { PublishHeader } from "../components/publish/PublishHeader";

export const Publish = memo(() => {
    // Reset form whenever the page loads
    useEffect(() => {
        usePublishStore.getState().resetForm();
    }, []);

    return (
        <>
            <Layout>
                <div className="min-h-screen bg-gray-50">
                    <Appbar />

                    {/* Header Section */}
                    <PublishHeader />

                    {/* Main Content */}
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                        <motion.div
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div className="p-6 sm:p-8 lg:p-12">
                                {/* Each component manages its own state */}
                                <TitleEditor />
                                <CategorySelector />
                                <ImageUploadWrapper />
                                <ContentEditor />

                                {/* Publish Section */}
                                <div className="pt-6 border-t border-gray-200">
                                    <PublishButtonOptimized />
                                </div>
                            </div>
                        </motion.div>

                        {/* Writing Tips */}
                        <WritingTips />
                    </div>
                </div>
            </Layout>
            <CreativeLoader />
        </>
    );
});
