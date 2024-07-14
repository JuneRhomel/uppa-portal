import PropertyStatusEntity from "../../domain/entity/property_status.entity"

export default interface DeletePropertyStatusModalParams {
    propertyStatus: PropertyStatusEntity
    handleClose: () => void
    isOpen?: boolean
}