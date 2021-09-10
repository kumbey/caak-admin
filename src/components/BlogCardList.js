import React from "react";

const BlogCardList = () => {
  return (
    <div className="card p-5">
      <div className="overflow-x-auto">
        <table className="table table-auto table_hoverable w-full">
          <thead>
            <tr>
              <th className="w-px">
                <label className="custom-checkbox">
                  <input type="checkbox" checked partial />
                  <span />
                </label>
              </th>
              <th className="text-left uppercase">Title</th>
              <th className="text-center uppercase">Views</th>
              <th className="text-center uppercase">Date</th>
              <th className="text-center uppercase">Pulbished</th>
              <th className="uppercase" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label className="custom-checkbox">
                  <input type="checkbox" data-toggle="rowSelection" />
                  <span />
                </label>
              </td>
              <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
              <td className="text-center">100</td>
              <td className="text-center">December 15, 2019</td>
              <td className="text-center">
                <div className="badge badge_outlined badge_secondary uppercase">
                  Draft
                </div>
              </td>
              <td className="text-right whitespace-nowrap">
                <div className="inline-flex ml-auto">
                  <a
                    href="#dada"
                    className="btn btn-icon btn_outlined btn_secondary"
                  >
                    <span className="la la-pen-fancy" />
                  </a>
                  <a
                    href="fafa#"
                    className="btn btn-icon btn_outlined btn_danger ml-2"
                  >
                    <span className="la la-trash-alt" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label className="custom-checkbox">
                  <input type="checkbox" data-toggle="rowSelection" />
                  <span />
                </label>
              </td>
              <td>
                Donec tempor lacus quis ex ullamcorper, ut cursus dui
                pellentesque.
              </td>
              <td className="text-center">150</td>
              <td className="text-center">December 10, 2019</td>
              <td className="text-center">
                <div className="badge badge_outlined badge_success uppercase">
                  Published
                </div>
              </td>
              <td className="text-right whitespace-nowrap">
                <div className="inline-flex ml-auto">
                  <a
                    href="#gaga"
                    className="btn btn-icon btn_outlined btn_secondary"
                  >
                    <span className="la la-pen-fancy" />
                  </a>
                  <a
                    href="haga#"
                    className="btn btn-icon btn_outlined btn_danger ml-2"
                  >
                    <span className="la la-trash-alt" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label className="custom-checkbox">
                  <input type="checkbox" data-toggle="rowSelection" />
                  <span />
                </label>
              </td>
              <td>
                Quisque molestie velit sed elit finibus, nec gravida nunc
                finibus.
              </td>
              <td className="text-center">300</td>
              <td className="text-center">December 5, 2019</td>
              <td className="text-center">
                <div className="badge badge_outlined badge_secondary uppercase">
                  Draft
                </div>
              </td>
              <td className="text-right whitespace-nowrap">
                <div className="inline-flex ml-auto">
                  <a
                    href="fbhja"
                    className="btn btn-icon btn_outlined btn_secondary"
                  >
                    <span className="la la-pen-fancy" />
                  </a>
                  <a
                    href="bfhaj"
                    className="btn btn-icon btn_outlined btn_danger ml-2"
                  >
                    <span className="la la-trash-alt" />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogCardList;