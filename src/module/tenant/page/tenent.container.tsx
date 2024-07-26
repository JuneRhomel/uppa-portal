import React from "react";
import { motion } from "framer-motion"

export default function TenantContainer() {
    return (
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>

        </motion.div>
    );
}