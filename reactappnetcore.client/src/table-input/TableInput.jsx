/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";

import ComponentHeader from "../form-elements/component-header";
import ComponentLabel from "../form-elements/component-label";
import FieldsetDustbin from '../multi-column/dustbin';
import ItemTypes from "../ItemTypes";

const accepts = [ItemTypes.BOX, ItemTypes.CARD];

export default function TableInputBase(props) {

  const [childData, setChildData] = useState({});
  const [childItems, setChildItems] = useState(null);
  const [childItemsTwoDArray, setChildItemsTwoDArray] = useState([]);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const { data, class_name, ...rest } = props;
    setChildData(data);
    setColumnCount(props.data.options.length);
    // setChildDataTwoDArray(convertTo2DArray(data, columnCount));

    let count = 1;

    createChild(props.data.options, data);

  }, [props]);

  useEffect(() => {
    setChildItemsTwoDArray(convertTo2DArray(childItems, columnCount));
    // console.log("childData", childData);
    // console.log("childItems", childItems);
    // console.log("props", props.data.options.length);
  }, [childItems])

  const convertTo2DArray = (arr, numCols) => {
    if (arr === null) return;
    const numRows = Math.ceil(arr.length / numCols);
    const twoDArray = [];

    let temp = 0;
    for (let i = 0; i < numRows; i++) {
      const row = [];
      for (let j = 0; j < numCols; j++) {
        if (temp < arr.length) {
          row.push(arr[temp]);
        } else {
          row.push(null);
        }
        temp = temp + 1;
      }
      twoDArray.push(row);
    }

    return twoDArray;
  }

  const addNewChild = () => {
    // setColumnCount(columnCount);
    let data = props.data;
    // let colCount=data.childItems.length+1;
    let colCount = columnCount;
    let oldChilds = data.childItems;
    data.childItems = Array.from({ length: colCount }, (v, i) => { return oldChilds[i] ? oldChilds[i] : null });

    setChildItems(data.childItems)
  }

  // const onDropSuccess = (droppedIndex) => {
  //   const totalChild = childItems ? childItems.length : 0;
  //   const isLastChild = totalChild === droppedIndex + 1;

  //   if (isLastChild) {
  //     addNewChild()
  //   }
  // }
  const onDropSuccess = (droppedIndex) => {
    addNewChild();
  }

  const createChild = (newOptions, data) => {
    const colCount = newOptions.length;
    const className = data.class_name || "col-md-12";
    if (!data.childItems) {
      // eslint-disable-next-line no-param-reassign
      data.childItems = Array.from({ length: colCount }, (v, i) => null);
      data.isContainer = true;
    } else {
      let oldChilds = data.childItems;
      data.childItems = Array.from({ length: (colCount * parseInt(data.rowCount)) }, (v, i) => { return oldChilds[i] ? oldChilds[i] : null });
    }
    setChildItems(data.childItems);
  };
  const {
    controls,
    editModeOn,
    getDataById,
    setAsChild,
    removeChild,
    seq,
    className,
    index,
  } = props;
  const { pageBreakBefore } = childData;
  let baseClasses = "SortableItem rfb-item";
  if (pageBreakBefore) {
    baseClasses += " alwaysbreak";
  }

  return (
    <div style={{ ...props.style }} className={baseClasses}>
      <ComponentHeader {...props} isFieldSet={true} />
      <div className="table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl table-responsive-xxl">
        <ComponentLabel {...props} />
        <table className="table table-info table-striped table-bordered">
          <thead>
            <tr>
              {props.data.options.map((column, index) => (
                <th key={`header_column_${index}`}>{column.text}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              childItemsTwoDArray?.map((childItem, row) => (
                <tr key={row} >
                  {childItem?.map((x, i) => (
                    <td key={`${row}_${i}_${x || "_"}`} style={{ minWidth: '200px', width: '100%' }} className="td-form-builder">
                      {controls ? (
                        controls[parseInt(row) * childItem.length + parseInt(i)]
                      ) : (
                        <FieldsetDustbin
                          style={{ width: "100%" }}
                          data={childData}
                          accepts={accepts}
                          items={childItems}
                          key={parseInt(row) * childItem.length + parseInt(i)}
                          col={parseInt(row) * childItem.length + parseInt(i)}
                          onDropSuccess={() => onDropSuccess(parseInt(row) * childItem.length + parseInt(i))}
                          parentIndex={index}
                          editModeOn={editModeOn}
                          _onDestroy={() => removeChild(childData, parseInt(row) * childItem.length + parseInt(i))}
                          getDataById={getDataById}
                          setAsChild={setAsChild}
                          seq={seq}
                          rowNo={parseInt(row) * childItem.length + parseInt(i)}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            <tr>
              {/* {
                childItems?.map((x, i) => (
                  <td key={`${i}_${x || "_"}`} style={{ minWidth: '200px', width: '100%' }}>
                    {controls ? (
                      controls[i]
                    ) : (
                      <FieldsetDustbin
                        style={{ width: "100%" }}
                        data={childData}
                        accepts={accepts}
                        items={childItems}
                        key={i}
                        col={i}
                        onDropSuccess={() => onDropSuccess(i)}
                        parentIndex={index}
                        editModeOn={editModeOn}
                        _onDestroy={() => removeChild(childData, i)}
                        getDataById={getDataById}
                        setAsChild={setAsChild}
                        seq={seq}
                        rowNo={i}
                      />
                    )}
                  </td>
                ))} */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
