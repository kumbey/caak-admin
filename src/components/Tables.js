export default function Tables(props) {
    return (
        <table className={`table table_${props.styles} ${props.fullWidth ? "w-full" : ""} mt-20`}>
                        <thead>
                            <tr>
                                <th className="text-left uppercase">#</th>
                                <th className="text-left uppercase">First</th>
                                <th className="text-left uppercase">Last</th>
                                <th className="text-left uppercase">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>@john</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>@john</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>@john</td>
                            </tr>
                        </tbody>
                    </table>
    )
}
