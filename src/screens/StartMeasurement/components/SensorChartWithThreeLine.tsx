import React from "react";
import { Text } from "@components/Text";
import { Colors } from "@theme/Colors";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";

interface Props {
    title: string;
    xLabelTitle: string;
    yLabelTitle: string;
    x: (number | undefined)[];
    y: (number | undefined)[];
    z: (number | undefined)[];
}

export class SensorChartWithThreeLine extends React.Component<Props> {
    private whiteStyle = {
        axis: { stroke: "white" },
        axisLabel: { fontSize: 20, padding: 30, fill: "white" },
        ticks: { stroke: "white", size: 5 },
        tickLabels: { fontSize: 15, padding: 5, fill: "white" },
    };

    public render(): React.ReactElement {
        return (
            <>
                <Text style={{ fontSize: 24, marginTop: 20 }}>{this.props.title}</Text>
                <VictoryChart>
                    <VictoryAxis label={this.props.xLabelTitle} style={this.whiteStyle} />
                    <VictoryAxis dependentAxis label={this.props.yLabelTitle} style={this.whiteStyle} />
                    <VictoryLine
                        data={this.props.x}
                        style={{
                            data: {
                                stroke: Colors.white,
                            },
                            parent: {
                                border: `1px solid ${Colors.white}`,
                            },
                        }}
                    />
                    <VictoryLine
                        data={this.props.y}
                        style={{
                            data: {
                                stroke: Colors.limeade,
                            },
                            parent: {
                                border: `1px solid ${Colors.limeade}`,
                            },
                        }}
                    />
                    <VictoryLine
                        data={this.props.z}
                        style={{
                            data: {
                                stroke: Colors.red,
                            },
                            parent: {
                                border: `1px solid ${Colors.red}`,
                            },
                        }}
                    />
                </VictoryChart>
            </>
        );
    }
}


