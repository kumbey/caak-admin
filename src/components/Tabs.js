import React from "react"

export default function Tabs() {
    return (
        <div className="tabs">
            <nav className="tab-nav">
                <button className="nav-link h5 uppercase active" data-toggle="tab" data-target="#tab-1">Tab
                    One</button>
                <button className="nav-link h5 uppercase" data-toggle="tab" data-target="#tab-2">Tab
                    Two</button>
                <button className="nav-link h5 uppercase" data-toggle="tab" data-target="#tab-3">Tab
                    Three</button>
            </nav>
            <div className="tab-content mt-5">
                <div id="tab-1" className="collapse open">
                    tab 1
                    <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi veritatis officiis,
                    quidem placeat autem nihil voluptatem velit quaerat adipisci veniam iste. Quae odio sint
                    dolorum aliquid eos numquam est ducimus! Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Itaque enim alias odit facilis, necessitatibus quam nulla! Sapiente
                    nostrum nulla ut, aspernatur nisi unde enim quas ipsam laudantium excepturi vel
                    consequuntur.
                </div>
                <div id="tab-2" className="collapse">
                    tab 2 <br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi veritatis officiis,
                    quidem placeat autem nihil voluptatem velit quaerat adipisci veniam iste. Quae odio sint
                    dolorum aliquid eos numquam est ducimus! Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Itaque enim alias odit facilis, necessitatibus quam nulla! Sapiente
                    nostrum nulla ut, aspernatur nisi unde enim quas ipsam laudantium excepturi vel
                    consequuntur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi veritatis
                    officiis, quidem placeat autem nihil voluptatem velit quaerat adipisci veniam iste. Quae
                    odio sint dolorum aliquid eos numquam est ducimus! Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Itaque enim alias odit facilis, necessitatibus quam nulla!
                    Sapiente nostrum nulla ut, aspernatur nisi unde enim quas ipsam laudantium excepturi vel
                    consequuntur.
                </div>
                <div id="tab-3" className="collapse">
                    tab 3<br/>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi veritatis officiis,
                    quidem placeat autem nihil voluptatem velit quaerat adipisci veniam iste. Quae odio sint
                    dolorum aliquid eos numquam est ducimus! Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Itaque enim alias odit facilis, necessitatibus quam nulla! Sapiente
                    nostrum nulla ut, aspernatur nisi unde enim quas ipsam laudantium excepturi vel
                    consequuntur.
                </div>
            </div>
        </div>
    )
}
