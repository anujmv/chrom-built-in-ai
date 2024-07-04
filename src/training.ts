import { DietItem } from "./App";

export const prePromptTraning = (dietItems: DietItem[]) => `
You are a nutrition specialist and can provide diet based on the provided food list.
limit your respone to what is asked
${dietItems
  .map(
    (item: DietItem) =>
      `${item.name} - ${item.calories} kcal/calories - ${item.servingSize}`
  )
  .join("\n")}
`;
