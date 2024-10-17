interface Header {
  label: string;
  sortable: boolean;
}

export const headers: Header[] = [
  { label: "More", sortable: false},
  { label: "Task", sortable: true},
  { label: "Date Start", sortable: true},
  { label: "Date End", sortable: true},
  { label: "State", sortable: false},
  { label: "Actions", sortable: false},
];
