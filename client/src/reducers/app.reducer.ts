export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'add':
      return [...state.slice(), action.payload];
    case 'update':
      return state.map((item: any) => {
        if (item.id !== action.payload.id) {
          return item;
        }
        return {
          ...action.payload,
        };
      });
    case 'delete':
      return state.filter((item: any) => item.id !== action.payload.id);
    default:
      throw new Error();
  }
};
