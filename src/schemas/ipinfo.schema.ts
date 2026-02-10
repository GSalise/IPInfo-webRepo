import z from "zod";

export const IPInfoSchema = z.object({
  ipInfoId: z.number(),
  ipAddress: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  postal: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
});

export const IPInfoWithHistoryIdSchema = z.object({
  userHistoryId: z.number(),
  ipAddress: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  postal: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  isActive: z.boolean(),
  createdAt: z.string(),
});

export const IPInfoListSchema = z.array(IPInfoSchema);
export const IPInfoWithHistoryListSchema = z.array(IPInfoWithHistoryIdSchema);

export type IPInfoData = z.infer<typeof IPInfoSchema>;
export type IPInfoDataList = z.infer<typeof IPInfoListSchema>;

export type IPInfoWithHistoryIdData = z.infer<typeof IPInfoWithHistoryIdSchema>;
export type IPInfoWithHistoryIdDataList = z.infer<
  typeof IPInfoWithHistoryListSchema
>;
