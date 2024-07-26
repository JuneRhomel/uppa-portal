import React from "react";
import ContainerStyle from "../../../components/container/style/container.style";
import { motion } from "framer-motion"

export default function TenantContainer() {
    return (
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
            <ContainerStyle>
                <div>Tenant</div>
            </ContainerStyle>
        </motion.div>
    );
}