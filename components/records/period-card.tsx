import Container from "@/components/layout/container/container";
import Title from "@/components/layout/container/title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MetricRecord,
  METRIC_META,
  RecordExtreme,
  RecordsResponse,
  fmtTime,
  fmtValue,
} from "./types";

// PeriodCard shows one period's records: a metric per row with its high and,
// where meaningful, its low. Each extreme carries the value and the time it
// happened.
export default function PeriodCard({
  heading,
  data,
  withYear,
}: {
  heading: string;
  data: RecordsResponse;
  withYear: boolean;
}) {
  const anyLow = data.records.some((r) => r.low);

  return (
    <Container>
      <Title title={heading} />
      {data.records.length === 0 ? (
        <p className="text-sm text-muted-foreground">no readings for this period yet</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>High</TableHead>
              {anyLow && <TableHead>Low</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.records.map((r) => (
              <MetricRow key={r.metric} record={r} withYear={withYear} anyLow={anyLow} />
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

function MetricRow({
  record,
  withYear,
  anyLow,
}: {
  record: MetricRecord;
  withYear: boolean;
  anyLow: boolean;
}) {
  const meta = METRIC_META[record.metric] ?? { label: record.metric, unit: "" };
  return (
    <TableRow>
      <TableCell className="text-sm font-medium align-top">{meta.label}</TableCell>
      <TableCell className="align-top">
        {record.high ? (
          <Extreme extreme={record.high} unit={meta.unit} withYear={withYear} />
        ) : (
          <Dash />
        )}
      </TableCell>
      {anyLow && (
        <TableCell className="align-top">
          {record.low ? (
            <Extreme extreme={record.low} unit={meta.unit} withYear={withYear} />
          ) : (
            <Dash />
          )}
        </TableCell>
      )}
    </TableRow>
  );
}

function Extreme({
  extreme,
  unit,
  withYear,
}: {
  extreme: RecordExtreme;
  unit: string;
  withYear: boolean;
}) {
  return (
    <div className="leading-tight">
      <div className="font-mono-data text-sm font-bold tracking-tight">
        {fmtValue(extreme.value)}
        {unit && (
          <span className="ml-0.5 text-xs font-normal text-muted-foreground">{unit}</span>
        )}
      </div>
      <div className="text-xs text-muted-foreground">{fmtTime(extreme.time, withYear)}</div>
    </div>
  );
}

function Dash() {
  return <span className="text-sm text-muted-foreground">—</span>;
}
