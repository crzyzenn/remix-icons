import { useState } from "react";
import { ActionPanel, Action, Grid, Color } from "@raycast/api";
import { remixIcons } from "./remix-icon-names";
const ICON_PREFIX = "ri-";

export default function Command() {
  const [columns, setColumns] = useState(5);
  const [isLoading] = useState(false);

  return (
    <Grid
      columns={columns}
      inset={Grid.Inset.Large}
      isLoading={isLoading}
      searchBarPlaceholder="Search icons"
      searchBarAccessory={
        <Grid.Dropdown
          tooltip="Grid Item Size"
          storeValue
          onChange={(newValue) => {
            setColumns(parseInt(newValue));
          }}
        >
          <Grid.Dropdown.Item title="Large" value={"3"} />
          <Grid.Dropdown.Item title="Medium" value={"5"} />
          <Grid.Dropdown.Item title="Small" value={"8"} />
        </Grid.Dropdown>
      }
    >
      {remixIcons.map((name) => (
        <Grid.Item
          key={name}
          content={{
            value: { source: `icons/${name}`, tintColor: Color.PrimaryText },
            tooltip: name,
          }}
          title={name}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={`${ICON_PREFIX}${name}`} />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
