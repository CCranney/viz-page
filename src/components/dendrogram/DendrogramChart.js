import { useState, useEffect } from "react";
import * as d3 from "d3";

export const DendrogramChart = () => {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    /*
    useEffect(() => {
        d3.csv('https://raw.githubusercontent.com/CCranney/viz-page/dendrogram/public/data/treeoflife_links.csv').then((d) => {
            console.log(d);
            const hierarchyGenerator = d3.stratify()
                .id((node) => node.target_node_id)
                .parentId((node) => node.source_node_id);
            const hierarchy = hierarchyGenerator(d);
            console.log(hierarchy);

            setData(data);
            setLoading(false);
        });
    }, [])
    */


    return (
        <div>DendrogramChart</div>
    )
}
