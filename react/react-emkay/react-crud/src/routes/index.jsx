//import react router dom
import { Routes, Route } from "react-router-dom";

//import view homepage
import Home from '../views/home.jsx';

//import view product index
import ProductIndex from '../views/product/index.jsx';

//import view post create
import ProductCreate from '../views/product/create.jsx';

//import view post edit
import ProductEdit from '../views/product/edit.jsx';

function RoutesIndex() {
    return (
        <Routes>

            {/* route "/" */}
            <Route path="/" element={<Home />} />

            {/* route "/product" */}
            <Route path="/product" element={<ProductIndex />} />

            {/* route "/product/create" */}
            <Route path="/product/create" element={<ProductCreate />} />

            {/* route "/product/edit/:id" */}
            <Route path="/product/edit/:id" element={<ProductEdit />} />

        </Routes>
    )
}

export default RoutesIndex