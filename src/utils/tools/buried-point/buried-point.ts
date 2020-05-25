const buriedPoint = (cscData: any) => {
    window._czc && window._czc.push(["_trackEvent", cscData.category, cscData.action, cscData.label ? cscData.label : '']);
}
export { buriedPoint }
