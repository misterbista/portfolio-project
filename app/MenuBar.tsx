import React from 'react';
import {Sidebar} from "primereact/sidebar";

const MenuBar = () => {
  return (
    <Sidebar
      position={"left"}
      visible={false}
      header={<div style={{width: "100%", textAlign: "center"}}>Photo here centered along with <br/> social links <br/> that may take upto 3 <br/> or 4 lines</div>}
      closeIcon={<div style={{height: "100%"}}>X top</div>}
      onHide={() => {}}
    >
      test
    </Sidebar>
  );
};

export default MenuBar;