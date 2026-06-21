import {CraftFairInfo, PromotionalCampaignInfo, StorytellingInfo } from "./event-types.dto";

export interface EventDetailsDto {
  id: number;
  title: string;
  description: string;
  type: string;
  ownerUsername: string;
  startDate: string;
  endDate: string;
  active: boolean;

  storytellingInfo: StorytellingInfo | null;
  craftFairInfo: CraftFairInfo | null;
  promotionalCampaignInfo: PromotionalCampaignInfo | null;
}
