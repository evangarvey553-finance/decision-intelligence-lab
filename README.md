# Decision Intelligence Lab

By Evan Garvey. [Explore the live case study](https://evangarvey553-finance.github.io/decision-intelligence-lab/).

## Northstar Digital Services: Q3 close and annual outlook

A fictional subscription-services company with 1,000 employees and a $20M annual technology operating-expense plan. Investigate $290K of reported Q3 overspend, reconcile three source exceptions, and model Q4 operating actions.

### Explore

- 45 monthly category-level ledger records, January–September, with filters and CSV download.
- $80K labor cutoff reallocation, $55K duplicate software accrual, and a $30K cloud evidence check.
- Quantity/rate/mix drivers, category variance analysis, and reported-to-management reconciliation.
- Q4 forecasts and included vendor commitments, with no double-counting of open purchase orders.
- Cloud discount timing, implementation expense, contractor capacity, software seats, and demand sensitivity.
- Dynamic decision memo and downloadable text with benefits, remaining budget exposure, risks, owners, and approval gates.

### Reconciliation checkpoints ($000)

| State | Q3 management view | Q4 forecast | FY forecast |
| --- | ---: | ---: | ---: |
| Uncorrected base | 5,290 | 5,360 | 20,650 |
| Labor cutoff only | 5,210 | 5,440 | 20,650 |
| Both expense corrections | 5,155 | 5,440 | 20,595 |
| Both corrections + action package | 5,155 | 5,293 | 20,448 |

Action package: 8% cloud rate reduction effective October; two contractor-months avoided; 120 software seats removed; no incremental demand growth. Gross benefit $172K less $25K implementation expense = $147K net Q4 benefit. Remaining annual exposure is $448K. The $55K duplicate correction is reported separately from operational benefit.

## Scope and transparency

All company/vendor names, records, reference IDs, supporting conclusions and financial outcomes are synthetic. No real supporting documents are fetched; the control selections simulate reviewing embedded case evidence. Monthly records aggregate categories, not invoices. Q1 and Q2 actuals equal plan by simplifying assumption. Q4 is built from explicit operating assumptions, not statistical extrapolation. This case models technology operating expense, not a full company P&L, cash flow or capital plan.

Finance-domain framing and review are central to the project. AI assisted implementation, presentation and draft explanations. This is an independent proof of concept, not production software. Modeled opportunities are unapproved, not realized savings or employer accomplishments.

## Run and validate

Open `index.html` in a modern browser. No dependencies, credentials or backend are required. Changes are local to the current tab and reset on reload.

Run financial model checks with Node.js:

```sh
node tests/finance-case.cjs
```

Checks cover source/category totals, known scenario results, timing conservation, and 144 scenario reconciliations. Browser QA covers corrections, scenario changes, filters, generated downloads and responsive layouts.

The image in `social/Decision_Intelligence_Lab_Preview.png` records the earlier lightweight prototype and is not a current screenshot of this expanded case.

## Increment 2: inspect one source-to-decision workflow

The new **Validate source records** section adds seven synthetic September external-labor records totaling $381.5K. Four map automatically ($304.5K); three are held ($77K) for a missing contract, ambiguous vendor or unknown alias. A small master budget-ID reference supplies canonical vendors, recognized aliases, contracts, reporting category and accountable role.

Visitors inspect embedded fictional evidence, propose a budget ID and acknowledge review. The model rejects a proposal that conflicts with evidence and preserves original source fields. Successful record-level resolutions appear in a browser-tab session history and a downloadable source/mapping CSV. These are simulated reviews, not authenticated approvals; no actual documents or AI service are called. The raw vendor, original contract, matched ID, rule version and evidence reference remain inspectable. A reset or page reload clears the mapping session.

The seven records supply the September labor subtotal within reported Q3 labor: $708.5K July–August plus $381.5K September = $1,090K. The $80K October-service record supports the existing cutoff correction. Held records remain in reported expense and the provisional forecast, never becoming artificial savings. Mapping resolutions change review status, not expense. The memo remains provisional while mappings or financial checks are unresolved.

This is one bounded source-record slice. The other categories remain modeled aggregates. The existing Northstar forecast, financial scenarios and synthetic-data disclosures are retained.

Run the additional mapping checks:

```sh
node tests/mapping-case.cjs
```

They cover deterministic detection, invalid/unsupported proposal rejection, all eight resolution combinations, raw-record preservation, source/aggregate ties and period-transfer conservation. The original financial test suite remains passing.
