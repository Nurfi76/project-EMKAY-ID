<?php
namespace App\Http\Controllers\Api;

//import model Product
use App\Models\product;

use App\Http\Controllers\Controller;

//import resource ProductResource
use App\Http\Resources\ProductResource;

//import Http request
use Illuminate\Http\Request;

//import facade Validator
use Illuminate\Support\Facades\Validator;

//import facade Storage
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
 /**
     * index
     *
     * @return void
     */
    public function index()
    {
        //get all product
        $products = product::latest()->paginate(5);

        //return collection of product as a resource
        return new ProductResource(true, 'List Data Product', $products);
    }

     /**
     * store
     *
     * @param  mixed $request
     * @return void
     */
    public function store(Request $request)
    {
        // Define validation rules
    $validator = Validator::make($request->all(), [
        'product_name' => 'required|string|max:150',
        'category'     => 'required|string|max:100',
        'price'        => 'required|numeric',
        'discount'     => 'nullable|numeric',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Create product
    $products = product::create([
        'product_name' => $request->product_name,
        'category'     => $request->category,
        'price'        => $request->price,
        'discount'     => $request->discount,
    ]);

    // Return response
    return response()->json([
        'success' => true,
        'message' => 'Data Product Berhasil Ditambahkan!',
        'data'    => $products,
    ]);
    }

    /**
     * show
     *
     * @param  mixed $id
     * @return void
     */
    public function show($id)
    {
        //find post by ID
        $products = product::find($id);

        //return single post as a resource
        return new ProductResource(true, 'Detail Data Product!', $products);
    }

        /**
     * update
     *
     * @param  mixed $request
     * @param  mixed $id
     * @return void
     */
    public function update(Request $request, $id)
    {
    // Define validation rules
    $validator = Validator::make($request->all(), [
        'product_name' => 'required|string|max:150',
        'category'     => 'required|string|max:100',
        'price'        => 'required|numeric',
        'discount'     => 'nullable|numeric',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    // Find product by ID
    $products = product::find($id);

    if (!$products) {
        return response()->json(['error' => 'Product not found'], 404);
    }

    // Update product
    $products->update([
        'product_name' => $request->product_name,
        'category'     => $request->category,
        'price'        => $request->price,
        'discount'     => $request->discount,
    ]);

    // Return response
    return response()->json([
        'success' => true,
        'message' => 'Data Product Berhasil Diubah!',
        'data'    => $products,
    ]);
}
   
/**
     * destroy
     *
     * @param  mixed $id
     * @return void
     */
    public function destroy($id)
    {

        //find post by ID
        $products = product::find($id);

        //delete post
        $products->delete();

        //return response
        return new ProductResource(true, 'Data Product Berhasil Dihapus!', null);
    }

}
