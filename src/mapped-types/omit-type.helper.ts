import { MappedType } from './mapped-type.interface'
import {
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from './type-helper.utils'
import { RemoveFieldsWithType } from './remove-fields-with-type.interface'
import { Type } from './type.interface'

export function OmitType<T, K extends keyof T>(
  classRef: Type<T>,
  keys: readonly K[],
) {
  const isInheritedPredicate = (propertyKey: string) =>
    !keys.includes(propertyKey as K)

  abstract class OmitClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate)
    }
  }

  inheritValidationMetadata(classRef, OmitClassType, isInheritedPredicate)
  inheritTransformationMetadata(classRef, OmitClassType, isInheritedPredicate)

  return OmitClassType as MappedType<
    RemoveFieldsWithType<Omit<T, typeof keys[number]>, Function>
  >
}
