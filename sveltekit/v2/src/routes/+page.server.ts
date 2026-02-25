export const ssr = true;

export const load = async () => {
  // #region agent log
  fetch('http://127.0.0.1:7366/ingest/238333eb-f753-4e92-852d-f061d3427062',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f873fb'},body:JSON.stringify({sessionId:'f873fb',location:'src/routes/+page.server.ts:4',message:'load handler hit',data:{},timestamp:Date.now(),hypothesisId:'1'})}).catch(()=>{});
  // #endregion
  return {
    message: "Hello from SvelteKit",
  };
};
