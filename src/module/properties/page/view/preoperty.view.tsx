import { CopyIcon } from '@radix-ui/react-icons';
import { Badge, Code, DataList, Flex, IconButton, Link, Table, Separator , Text} from '@radix-ui/themes';
import React from 'react';
import { useParams } from 'react-router-dom';
import ContentComponent from '../../../../components/content/content.component';

export default function PreopertyView() {
    const { id } = useParams();

    const fetchProperty = () => {
        return null
    }

    return (
        <div>
            <ContentComponent >
                <DataList.Root>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">ID</DataList.Label>
                        <DataList.Value>
                            <Flex align="center" gap="2">
                                <Code variant="ghost">u_2J89JSA4GJ</Code>
                                <IconButton
                                    size="1"
                                    aria-label="Copy value"
                                    color="gray"
                                    variant="ghost"
                                >
                                    <CopyIcon />
                                </IconButton>
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">Property Name</DataList.Label>
                        <DataList.Value>
                            Unit 101
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Item align="center">
                            <DataList.Label minWidth="158px">Status</DataList.Label>
                            <DataList.Value>
                                <Badge color="jade" variant="soft" radius="full">
                                    Avalable
                                </Badge>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Label minWidth="158px">Type</DataList.Label>
                        <DataList.Value>Studio Unit</DataList.Value>
                    </DataList.Item>

                    <DataList.Item>
                        <DataList.Label minWidth="158px">Created At</DataList.Label>
                        <DataList.Value>
                            June 20, 2022
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </ContentComponent>
            <Separator size={'4'} my={'5'} />
            <ContentComponent >
                <Text size={'4'} weight={'bold'}>Tenant History</Text>
                <Table.Root variant='surface' mt={'3'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Type</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        <Table.Row>
                            <Table.Cell>Avalable</Table.Cell>
                            <Table.Cell>Studio Unit</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </ContentComponent>
        </div>
    );
}