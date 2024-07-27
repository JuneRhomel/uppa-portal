import React from 'react';
import { Flex, Text, Button, Tooltip } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Pagination({ totalRows, recordsPerPage }) {
    const navigate = useNavigate();
    const location = useLocation();
    const totalPages = Math.ceil(totalRows / recordsPerPage) as number;
    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        const queryPathParameters = new URLSearchParams(location.search);
        queryPathParameters.set("page", page.toString());
        navigate(`?${queryPathParameters.toString()}`);
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
                    <Tooltip content={"Previous Page"}>
                        <Button variant={"soft"} onClick={() => handlePageChange(currentPage - 1)}>
                            <ChevronLeftIcon />
                        </Button>
                    </Tooltip>
                )}
                {getPageNumbers().map((page) => (
                    <Button variant={"outline"}
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={page === currentPage}
                    >
                        {page}
                    </Button>
                ))}
                {currentPage < totalPages && (
                    <Tooltip content={"Next Page"}>

                        <Button variant={"soft"} onClick={() => handlePageChange(currentPage + 1)}>
                            <ChevronRightIcon />
                        </Button>
                    </Tooltip>
                )}
            </Flex>
        </Flex>
    );
}
