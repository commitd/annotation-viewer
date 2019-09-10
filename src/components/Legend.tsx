import * as React from 'react'
import { BackgroundProperty } from 'csstype'
import { makeStyles, Grid } from '@material-ui/core'
import { Checkbox, Typography } from '@commitd/components'
import Mark from './Mark'

interface LegendProps {
  markTypeColors: { [index: string]: BackgroundProperty<string> }
  selectedTypes: string[]
  onSelectionChange: (types: string[]) => void
  fadeMarks?: boolean
}
const useStyles = makeStyles(_theme => ({
  item: { paddingRight: '1em', userSelect: 'none' },
  container: {},
  mark: {
    paddingRight: '1em'
  }
}))

const Legend: React.FC<LegendProps> = ({
  markTypeColors,
  selectedTypes,
  onSelectionChange,
  fadeMarks
}) => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption">Legend</Typography>
        </Grid>
        {Object.keys(markTypeColors).map(t => (
          <Grid
            item
            className={classes.item}
            onClick={() =>
              selectedTypes.includes(t)
                ? onSelectionChange(selectedTypes.filter(type => type !== t))
                : onSelectionChange(selectedTypes.concat([t]))
            }
          >
            <Mark
              className={classes.mark}
              marks={[{ length: t.length, offset: 0, markType: t }]}
              hideMarkType={true}
              markTypeColors={markTypeColors}
              fade={fadeMarks}
            >
              <Checkbox
                checked={selectedTypes && selectedTypes.includes(t)}
                // onChange={e =>
                //   e.target.checked
                //     ? onSelectionChange(selectedTypes.concat([t]))
                //     : onSelectionChange(
                //         selectedTypes.filter(type => type !== t)
                //       )
                // }
              />
              <Typography display="inline">{t}</Typography>
            </Mark>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Legend
