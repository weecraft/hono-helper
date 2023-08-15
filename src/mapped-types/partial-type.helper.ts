import { MappedType } from './mapped-type.interface'
import {
  applyIsOptionalDecorator,
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from './type-helper.utils'
import { RemoveFieldsWithType } from './remove-fields-with-type.interface'
import { Type } from './type.interface'

export function PartialType<T>(classRef: Type<T>) {
  abstract class PartialClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef)
    }
  }

  const propertyKeys = inheritValidationMetadata(classRef, PartialClassType)
  inheritTransformationMetadata(classRef, PartialClassType)

  if (propertyKeys) {
    propertyKeys.forEach(key => {
      applyIsOptionalDecorator(PartialClassType, key)
    })
  }

  Object.defineProperty(PartialClassType, 'name', {
    value: `Partial${classRef.name}`,
  })

  return PartialClassType as MappedType<
    RemoveFieldsWithType<Partial<T>, Function>
  >
}
