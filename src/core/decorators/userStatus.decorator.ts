import { SetMetadata } from '@nestjs/common';

import { USER_STATUS_KEY } from 'src/core/static/constants';

export const SetUserStatus = (...statuses: string[]) => SetMetadata(USER_STATUS_KEY, statuses);