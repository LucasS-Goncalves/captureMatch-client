import { ResolveFn } from '@angular/router';
import { Photographer } from '../_models/photographer';
import { inject } from '@angular/core';
import { MemberService } from '../_services/member.service';

export const PhotographerResolver: ResolveFn<Photographer> = (route, state) => {
  const memberService = inject(MemberService)
  return memberService.getMember(route.paramMap.get('userName')!);
};
