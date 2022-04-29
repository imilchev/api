import { ReportReason } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateCampaignReportDto {
  @ApiProperty({ enum: ReportReason })
  reason?: ReportReason
  reportContent?: string
}
