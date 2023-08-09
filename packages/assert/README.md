<div align="center">

![PixelPizza Logo](https://raw.githubusercontent.com/PixelPizza/Images/main/ppbot2-text.png)

# @pixelpizza/assert

**Assertion decorators using [shapeshift].**

[![GitHub](https://img.shields.io/github/license/PixelPizza/utilities)](https://github.com/PixelPizza/utilities/blob/main/LICENSE.md)
[![codecov](https://codecov.io/gh/PixelPizza/utilities/branch/main/graph/badge.svg?token=s51JxWgrvm)](https://codecov.io/gh/PixelPizza/utilities)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@pixelpizza/assert?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@pixelpizza/assert)
[![npm](https://img.shields.io/npm/v/@pixelpizza/assert?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@pixelpizza/assert)

</div>

**Table of Contents**

-   [Description](#description)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [Basic Decorators](#basic-decorators)
        -   [`@Instance`](#instance)
        -   [`@IsFalse`](#isfalse)
        -   [`@IsNull`](#isnull)
        -   [`@IsTrue`](#istrue)
        -   [`@IsUndefined`](#isundefined)
        -   [`@Type`](#type)
        -   [`@Validator`](#validator)
    -   [Comparison Decorators](#comparison-decorators)
        -   [`@Range`](#range)
        -   [`@DateRange`](#daterange)
        -   [`@DivisibleBy`](#divisibleby)
        -   [`@EqualTo`](#equalto)
        -   [`@Unique`](#unique)
    -   [Date Decorators](#date-decorators)
        -   [`@InvalidDate`](#invaliddate)
        -   [`@ValidDate`](#validdate)
    -   [Number Decorators](#number-decorators)
        -   [`@Finite`](#finite)
        -   [`@Int`](#int)
        -   [`@SafeInt`](#safeint)
    -   [Sign Decorators](#sign-decorators)
        -   [`@Negative`](#negative)
        -   [`@Positive`](#positive)
    -   [String Decorators](#string-decorators)
        -   [`@Date`](#date)
        -   [`@Email`](#email)
        -   [`@Ip`](#ip)
        -   [`@Length`](#length)
        -   [`@Phone`](#phone)
        -   [`@Regex`](#regex)
        -   [`@Url`](#url)
        -   [`@Uuid`](#uuid)
-   [Contributors](#contributors)

## Description

This package provides decorators to do assertions on class attributes. It uses [shapeshift] to do the assertions.
You should use this package if you like [shapeshift], but want to do the assertions using decorators.

## Features

-   Written in TypeScript
-   Offers CommonJS and ESM bundles
-   Fully tested

## Installation

You can use the following command to install this package, or replace `npm install` with your package manager of choice.

```sh
npm install @pixelpizza/assert
```

You will also need to enable `experimentalDecorators` and disable `useDefineForClassFields` in your `tsconfig.json` file.

```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "useDefineForClassFields": false
    }
}
```

---

## Usage

You can import individual decorators or the all decorators.

```ts
import { Range } from "@pixelpizza/assert";
// or
import { Assert } from "@pixelpizza/assert"; // all decorators
// or
import Assert from "@pixelpizza/assert"; // all decorators
```

**Note:** This package can only be used in TypeScript since it uses experimental decorators. ES decorators are still in the proposal stage, they will be added to this package once they are implemented in Node.js LTS.

### Basic Decorators

#### `@Instance`

Checks if the value is an instance of the given value.

```ts
class Example {
    @Instance(Date)
    public value = new Date();
}
```

#### `@IsFalse`

Checks if the value is `false`.

```ts
class Example {
    @IsFalse
    public isFalse = false;
}
```

#### `@IsNull`

Checks if the value is `null`.

```ts
class Example {
    @IsNull
    public isNull = null;
}
```

#### `@IsTrue`

Checks if the value is `true`.

```ts
class Example {
    @IsTrue
    public isTrue = true;
}
```

#### `@IsUndefined`

Checks if the value is `undefined`.

```ts
class Example {
    @IsUndefined
    public isUndefined = undefined;
}
```

#### `@Type`

Validates the decorated property is of the given type.

```ts
class Example {
    @Type("string")
    public value = "Hello World!";
}
```

#### `@Validator`

Validates the decorated property using the given validator.

```ts
import { s } from "@sapphire/shapeshift";

class Example {
    @Validator(s.string)
    public value = "Hello World!";
}
```

### Comparison Decorators

#### `@Range`

Validates the decorated property is a number or bigint within the specified range.

```ts
class Example {
    @Range(0, 10)
    public value = 5;
}
```

#### `@DateRange`

Validates the decorated property is a date within the specified range.

```ts
class Example {
    @DateRange(new Date(2021, 0, 1), new Date(2021, 11, 31))
    public value = new Date(2021, 5, 1);
}
```

#### `@DivisibleBy`

Validates the decorated property is a number divisible by the given number.

```ts
class Example {
    @DivisibleBy(2)
    public value = 4;
}
```

#### `@EqualTo`

Validates the decorated property is equal to the given value.

```ts
class Example {
    @EqualTo("Hello World!")
    public value = "Hello World!";
}
```

#### `@Unique`

Validates the decorated property is an array with unique values.

```ts
class Example {
    @Unique
    public value = [1, 2, 3, 4, 5];
}
```

### Date Decorators

#### `@InvalidDate`

Validates the decorated property is an invalid date.

```ts
class Example {
    @InvalidDate
    public value = new Date("Hello World!");
}
```

#### `@ValidDate`

Validates the decorated property is a valid date.

```ts
class Example {
    @ValidDate
    public value = new Date();
}
```

### Number Decorators

#### `@Finite`

Validates the decorated property is a finite number.

```ts
class Example {
    @Finite
    public value = 5;
}
```

#### `@Int`

Validates the decorated property is an integer.

```ts
class Example {
    @Int
    public value = 5;
}
```

#### `@SafeInt`

Validates the decorated property is a safe integer.

```ts
class Example {
    @SafeInt
    public value = 5;
}
```

### Sign Decorators

#### `@Negative`

Validates the decorated property is a negative number or bigint.

```ts
class Example {
    @Negative
    public value = -5;
}
```

#### `@Positive`

Validates the decorated property is a positive number or bigint.

```ts
class Example {
    @Positive
    public value = 5;
}
```

### String Decorators

#### `@Date`

Validates the decorated property is a date string.

```ts
class Example {
    @Date
    public value = "2021-06-01";
}
```

#### `@Email`

Validates the decorated property is an email address.

```ts
class Example {
    @Email
    public value = "email@example.com";
}
```

#### `@Ip`

Validates the decorated property is an IP address.

```ts
class Example {
    @Ip
    public value = "192.168.0.0";
}
```

#### `@Length`

Validates the decorated property is a string with a length within the specified range.

```ts
class Example {
    @Length(0, 15)
    public value = "Hello World!";
}
```

#### `@Phone`

Validates the decorated property is a phone number.

```ts
class Example {
    @Phone
    public value = "123-456-7890";
}
```

#### `@Regex`

Validates the decorated property is a string that matches the given regular expression.

```ts
class Example {
    @Regex(/^[a-z]+$/)
    public value = "hello";
}
```

#### `@Url`

Validates the decorated property is a URL.

```ts
class Example {
    @Url
    public value = "https://example.com";
}
```

#### `@Uuid`

Validates the decorated property is a UUID.

```ts
class Example {
    @Uuid
    public value = "ae1a26c4-c813-459d-9095-4ddf908ab514";
}
```

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who contributed!

<a href="https://github.com/PixelPizza/utilities/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=PixelPizza/utilities" />
</a>

[contributing]: https://github.com/PixelPizza/.github/blob/main/.github/CONTRIBUTING.md
[shapeshift]: https://npmjs.com/package/@sapphire/shapeshift
