type allowKeysOptions = {
  [key: string]: any;
};

export const pricing: allowKeysOptions = {
  '1': {
    microsoft: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      if (quantity === 3) {
        return quantity * price - price;
      }
      return quantity * price;
    },
    facebook: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    amazon: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    default: (quantity: number, price: number): number => {
      return quantity * price;
    }
  },

  '2': {
    microsoft: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    facebook: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice = 0
    ): number => {
      if (quantity === 5) {
        return quantity * price - price;
      }
      return quantity * price;
    },
    amazon: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice = 0
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    default: (quantity: number, price: number): number => {
      return quantity * price;
    }
  },

  '3': {
    microsoft: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    facebook: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    amazon: (
      quantity: number,
      price: number,
      allowDiscount: boolean,
      discountPrice: number
    ): number => {
      const discount = allowDiscount ? discountPrice : price;
      return quantity * discount;
    },
    default: (quantity: number, price: number): number => {
      return quantity * price;
    }
  }
};

export const allowDiscount: allowKeysOptions = {
  amazon: [3],
  microsoft: [],
  facebook: [],
  default: []
};

export default { pricing, allowDiscount };
