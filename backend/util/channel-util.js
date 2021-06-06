exports.buildCid = (uid, fid) => {
  return uid > fid ? uid + fid : fid + uid;
};

exports.buildDid = (uid, cid) => {
  return uid + cid;
};
