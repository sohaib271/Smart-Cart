export const Delay=(time:number)=>{
  return new Promise<void>((resolve, reject) => {
    setTimeout(()=>{
      resolve();
    },time*1000)
  })
}