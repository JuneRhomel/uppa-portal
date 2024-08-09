import { Box, Card, Flex, Avatar, Text, IconButton } from "@radix-ui/themes";
import React from "react";
import { MdDarkMode,MdLightMode } from "react-icons/md";


export default function CardComponent() {
    const handleTheme = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            location.reload();
            return localStorage.setItem("theme", "light");
        }
        location.reload();
        return localStorage.setItem("theme", "dark");
    }
    const renderIcon = () => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            return <MdDarkMode />
        }
        return <MdLightMode />
    }
    return (
        <Box >
            <Card>
                <Flex gap="3" align="center">
                    <Avatar
                        size="3"
                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                        radius="full"
                        fallback="T"
                    />
                    <Box>
                        <Text as="div" size="2" weight="bold">
                            Teodros Girmay
                        </Text>
                        <Text as="div" size="2" color="gray">
                            Engineering
                        </Text>
                    </Box>
                </Flex>
            </Card>
            <IconButton variant="soft" onClick={handleTheme}>{renderIcon()}</IconButton>
        </Box>
    )
}