import React from 'react';

function SearchProduct() {
  return (
    <div className="w-full flex justify-center gap-5 mb-5">
      <input type="text" placeholder="검색어를 입력하세요" className="flex w-3/12 p-1 w-3/10 border rounded-md" />
      <button className="hover:text-zinc-400 font-bold">검색</button>
    </div>
  );
}

export default SearchProduct;
