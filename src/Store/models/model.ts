import { getApi } from '@/fetchApi/fetch';
import { flow, types } from 'mobx-state-tree';

export const quizmodel = types
  .model('Quiz', {})
  .actions(self => {
   const getApii = flow(function* () {
      try {
       const res = yield getApi();
        return res?.result
        
      } catch (error) {
        return { success: false };
      }
    })


    return{
        getApii
    }
  });
  export function initquiz() {
    return quizmodel.create({})
  }