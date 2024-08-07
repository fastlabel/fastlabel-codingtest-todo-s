import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
class UpToLimitConstraint implements ValidatorConstraintInterface {
  async validate(_: any, args: ValidationArguments) {
    const [limit] = args.constraints;
    const repository = getRepository(args.object.constructor);
    if(await repository.findOne(args.value)) return true;
    return (await repository.count()) < limit;
  }

  defaultMessage(args: ValidationArguments) {
    const [limit] = args.constraints;
    return `Todo count is up to ${limit}.`;
  }
}

export function UpToLimit(limit: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string, a? : any, b? : any) {
    registerDecorator({
      name: "upToLimit",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [limit],
      options: validationOptions,
      validator: UpToLimitConstraint,
    });
  };
}
