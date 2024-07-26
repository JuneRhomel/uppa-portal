import React from 'react';
import { Flex, Text, Button } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

export default function Pagination({ totalRows, recordsPerPage }) {
    const totalPages = Math.ceil(totalRows / recordsPerPage) as number;
    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getPageNumbers = () => {
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        const pages: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <Flex justify="between" mt="4">
            <Text size="1" as="span">
                Total Records: {totalRows}
            </Text>

            <Flex gap="2">
                {currentPage > 1 && (
                    <Button onClick={() => handlePageChange(currentPage - 1)}>
                        <ChevronLeftIcon />
                    </Button>
                )}
                {getPageNumbers().map((page) => (
                    <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={page === currentPage}
                    >
                        {page}
                    </Button>
                ))}
                {currentPage < totalPages && (
                    <Button onClick={() => handlePageChange(currentPage + 1)}>
                        <ChevronRightIcon />
                    </Button>
                )}
            </Flex>
        </Flex>
    );
}
