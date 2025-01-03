# entries-rotator-card
This lovelace card let's you display entries and rotates between them at a given
interval.

## Config

Given that you have say an rss feed called `sensor.nrk` you can do:
```
- type: custom:entries-rotator-card
  entity: sensor.nrk
  interval: 30000
  attributes:
    - title
    - published
    - summary
  card_mod:
    style: |
      ha-card {
        box-shadow: none;
        background: none;
        border: none;
      }
      .title {
        font-size: 1.5em;
        font-weight: bold;
      }
      .published {
        color: red;
        font-size: 0.9em;
      }
      .summary {
        margin-top: 10px;
      }
```

The [card_mod](https://github.com/thomasloven/lovelace-card-mod) section is
optional but highly recommended as it's really useful. But it does require
separate installation.
