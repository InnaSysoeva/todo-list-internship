interface Header {
  label: string;
  sortable: boolean;
}

export const headers: Header[] = [
  { label: "Task", sortable: true },
  { label: "Start", sortable: true },
  { label: "End", sortable: true },
  { label: "State", sortable: false },
  { label: "More", sortable: false },
];
