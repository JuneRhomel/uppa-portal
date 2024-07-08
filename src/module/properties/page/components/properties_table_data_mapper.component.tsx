import React, { useState } from "react";
import {
  TableData,
  TableRowComponent,
  TbodyComponent,
} from "../../../../components/table/table.component";
import PropertiesTableDataMapperParams from "../interface/properties_table_data_mapper.params";
import ViewPropertyModalComponent from "./view_property_modal.component";
export default function PropertiesTableDataMapper({
  properties
}: PropertiesTableDataMapperParams) {
  const [selectedPropertyId, setSelectedPropertyId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (id: number) => {
    setSelectedPropertyId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <TbodyComponent>
        {properties.map((property) => (
          <TableRowComponent
            key={property.id}
            onClick={() => handleRowClick(property.id)}
          >
            <TableData>{property.id}</TableData>
            <TableData>{property.unit_name}</TableData>
            <TableData>{property.unit_type_name}</TableData>
            <TableData>{property.unit_status_name}</TableData>
          </TableRowComponent>
        ))}
      </TbodyComponent>
      {isModalOpen && (
        <ViewPropertyModalComponent isShow={isModalOpen} id={selectedPropertyId} handleClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
