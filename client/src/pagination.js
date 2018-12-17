// The pageSetUp function returns three arrays. One for all searches, one for the
// search items that should be displayed, and one with the contents of each button
// that should be displayed for pagination.
function pageSetUp(searches, page) {
  let itemCount = 10;
  let pages = Math.ceil(searches.length / itemCount);
  const pageObj = {};
  pageObj.items = [];
  pageObj.buttons = [];
  pageObj.searches = searches;
  if (page) {
    return newPage(itemCount, pages, page, pageObj, searches);
  } else {
    return noPage(itemCount, pages, pageObj, searches);
  }
}

// The pagination function is called when a page button is clicked. It calls the
// pageSetUp function with the current searches in state with the page number clicked.
function pagination(pageNum, searches) {
  return pageSetUp(searches, pageNum);
}

// The noPage function returns the list and btnList arrays for pageSetUp when no page
// number is supplied.
function noPage(itemCount, pages, pageObj, searches) {
  let searchLength;
  if (searches.length < itemCount) {
    searchLength = searches.length;
  } else {
    searchLength = itemCount;
  }
  for (let i = 0; i < searchLength; i += 1) {
    pageObj.items.push(searches[i]);
  }
  if (pages > 1) {
    if (pages > 5) {
      for (let i = 1; i <= 4; i += 1) {
        pageObj.buttons.push(i);
      }
      pageObj.buttons.push('. . .');
      pageObj.buttons.push(pages);
      return pageObj;
    } else {
      for (let i = 1; i <= pages; i += 1) {
        pageObj.buttons.push(i);
      }
      return pageObj;
    }
  } else {
    return pageObj;
  }
}

// The newPage function returns the list and btnList arrays for pageSetUp when a page
// number is supplied.
function newPage(itemCount, pages, page, pageObj, searches) {
  let loopLength;
  if (page === pages) {
    loopLength = searches.length;
  } else {
    loopLength = itemCount * page;
  }
  for (let i = itemCount * page - 10; i < loopLength; i += 1) {
    pageObj.items.push(searches[i]);
  }
  if (pages > 5) {
    if (page > 3 && pages - page >= 3) {
      pageObj.buttons.push(1);
      pageObj.buttons.push('. . .');
      pageObj.buttons.push(page - 1);
      pageObj.buttons.push(page);
      pageObj.buttons.push(page + 1);
      pageObj.buttons.push('. . .');
      pageObj.buttons.push(pages);
    } else if (page < 4) {
      pageObj.buttons.push(1);
      pageObj.buttons.push(2);
      pageObj.buttons.push(3);
      pageObj.buttons.push(4);
      pageObj.buttons.push('. . .');
      pageObj.buttons.push(pages);
    } else if (pages - page < 3) {
      pageObj.buttons.push(1);
      pageObj.buttons.push('. . .');
      pageObj.buttons.push(pages - 3);
      pageObj.buttons.push(pages - 2);
      pageObj.buttons.push(pages - 1);
      pageObj.buttons.push(pages);
    }
    return pageObj;
  } else {
    for (let i = 1; i <= pages; i += 1) {
      pageObj.buttons.push(i);
    }
    return pageObj;
  }
}


export { pageSetUp, pagination };
