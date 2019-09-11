import * as React from 'react'
import { BackgroundProperty } from 'csstype'
import { makeStyles, Grid } from '@material-ui/core'
import {
  Checkbox,
  Typography,
  FormControlLabel,
  FormGroup
} from '@commitd/components'
import Mark from './Mark'

interface LegendProps {
  markTypeColors: { [index: string]: BackgroundProperty<string> }
  inlineTypeColors: { [index: string]: BackgroundProperty<string> }
  selectedTypes: string[]
  onSelectionChange: (types: string[]) => void
  fadeMarks?: boolean
}
const useStyles = makeStyles(theme => ({
  item: { userSelect: 'none' },
  container: {},
  text: {
    paddingTop: 9,
    paddingBottom: 9,
    fontSize: 24,
    paddingRight: theme.spacing(2)
  }
}))

const Legend: React.FC<LegendProps> = ({
  markTypeColors,
  inlineTypeColors,
  selectedTypes,
  onSelectionChange,
  fadeMarks
}) => {
  const classes = useStyles()
  const typeColors = Object.assign({}, markTypeColors, inlineTypeColors)
  return (
    <>
      <Grid container className={classes.container} spacing={1}>
        <Grid item xs={12}>
          <Typography variant="caption">Legend</Typography>
        </Grid>
        {Object.keys(typeColors).map(t => {
          const onClick = () =>
            selectedTypes.includes(t)
              ? onSelectionChange(selectedTypes.filter(type => type !== t))
              : onSelectionChange(selectedTypes.concat([t]))
          return (
            <Grid key={t} item className={classes.item} onClick={onClick}>
              <Mark
                marks={[{ length: t.length, offset: 0, markType: t }]}
                hideMarkType={true}
                markTypeColors={typeColors}
                fade={fadeMarks}
                getTooltipText={null}
                onClick={onClick}
              >
                <FormGroup onClick={onClick}>
                  <FormControlLabel
                    onClick={onClick}
                    control={
                      <Checkbox
                        checked={selectedTypes && selectedTypes.includes(t)}
                        onClick={onClick}
                      />
                    }
                    label={
                      <span
                        style={{ position: 'relative', zIndex: 3 }}
                        onClick={onClick}
                      >
                        {t}
                      </span>
                    }
                  />
                </FormGroup>
              </Mark>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default Legend
